import { useEffect, useMemo, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { images, featuredImages } from "../components/data/galleryImages";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllImages, setShowAllImages] = useState(false);

  const imagesPerPage = 20;

  // --- Helper: normalize any url into "/images/filename.ext" when it's one of your site images
  const normalizeUrl = useCallback((url) => {
    if (!url) return url;

    // already correct root path
    if (url.startsWith("/images/")) return url;

    // if it’s a full nscharters URL
    if (url.startsWith("https://www.nscharters.com/images/")) {
      return url.replace("https://www.nscharters.com", "");
    }

    // if it’s "images/..." (missing leading slash)
    if (url.startsWith("images/")) return `/${url}`;

    // if it’s just "file.jpg"
    const looksLikeFile =
      /\.(png|jpe?g|webp|gif|svg)$/i.test(url) && !url.includes("/");
    if (looksLikeFile) return `/images/${url}`;

    // otherwise leave it alone (in case you have external images)
    return url;
  }, []);

 // --- Helper: detect grouper by title OR filename (case-insensitive)
  const isGrouper = (img) => {
    const title = img.title?.toLowerCase() || "";
    const url = img.url?.toLowerCase() || "";

  return title.includes("grouper") || url.includes("grouper");
};

  // Normalize your imported image arrays so the UI always uses correct paths
  const normalizedImages = useMemo(
    () =>
      images.map((img) => ({
        ...img,
        url: normalizeUrl(img.url),
      })),
    [normalizeUrl]
  );

  const normalizedFeatured = useMemo(
    () =>
      featuredImages.map((img) => ({
        ...img,
        url: normalizeUrl(img.url),
      })),
    [normalizeUrl]
  );

  const categories = useMemo(() => {
    const all = normalizedImages;

    const countTitle = (t) => all.filter((i) => i.title === t).length;
    const countCategory = (c) => all.filter((i) => i.category === c).length;
 
    return [
      { id: "all", label: "All Photos", count: all.length },
      { id: "redfish", label: "Redfish", count: countTitle("Redfish") },
      { id: "grouper", label: "Grouper", count: all.filter(isGrouper).length,},
      { id: "snook", label: "Snook", count: countTitle("Snook") },
      { id: "trout", label: "Speckled Trout", count: countTitle("Speckled Trout") },
      {
        id: "other-fish",
        label: "Other Fish",
      count: all.filter(
        (i) =>
          i.category === "catches" &&
          !isGrouper(i) &&
          !["redfish", "snook", "speckled trout"].includes(
            i.title?.toLowerCase() || ""
        )
      ).length
      },
      { id: "scalloping", label: "Scalloping", count: countCategory("scalloping") },
      { id: "wildlife", label: "Wildlife", count: countCategory("wildlife") },
    ];
  }, [normalizedImages]);

  const filteredImages = useMemo(() => {
    const all = normalizedImages;

    if (filter === "all") return all;
    if (filter === "redfish") return all.filter((img) => img.title === "Redfish");
    if (filter === "grouper") return all.filter(isGrouper);
    if (filter === "snook") return all.filter((img) => img.title === "Snook");
    if (filter === "trout") return all.filter((img) => img.title === "Speckled Trout");
if (filter === "other-fish")
  return all.filter((img) => {
    const title = img.title?.toLowerCase() || "";

    return (
      img.category === "catches" &&
      !isGrouper(img) &&
      !["redfish", "snook", "speckled trout"].includes(title)
    );
  });
    // otherwise treat filter as category
    return all.filter((img) => img.category === filter);
  }, [filter, normalizedImages]);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredImages.length / imagesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = filteredImages.slice(startIndex, endIndex);

  // If total pages shrink (changing filters), clamp currentPage
  useEffect(() => {
    if (currentPage !== safePage) setCurrentPage(safePage);
  }, [currentPage, safePage]);

  const goToNext = useCallback(() => {
    if (!selectedImage || filteredImages.length === 0) return;
    const currentIndex = filteredImages.findIndex((img) => img.url === selectedImage.url);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (safeIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  }, [filteredImages, selectedImage]);

  const goToPrevious = useCallback(() => {
    if (!selectedImage || filteredImages.length === 0) return;
    const currentIndex = filteredImages.findIndex((img) => img.url === selectedImage.url);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const prevIndex = safeIndex === 0 ? filteredImages.length - 1 : safeIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  }, [filteredImages, selectedImage]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "Escape") setSelectedImage(null);
    },
    [goToNext, goToPrevious, selectedImage]
  );

  useEffect(() => {
    if (!selectedImage) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handleKeyDown]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Photo Gallery</h1>
          <p className="text-xl text-blue-100">Recent trips, catches, and adventures with NS Charters</p>
        </div>
      </div>

      {/* Featured Images */}
      {!showAllImages && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Featured Catches</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {normalizedFeatured.map((image) => (
              <Card
                key={image.url}
                className="overflow-hidden cursor-pointer group hover:shadow-2xl transition"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square relative overflow-hidden bg-slate-200">
                  <img
                    src={image.url}
                    alt={image.title || "Gallery photo"}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  {image.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <span className="text-white font-bold text-xl">{image.title}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mb-8">
            <Button
              onClick={() => setShowAllImages(true)}
              size="lg"
              className="text-white font-semibold"
              style={{ backgroundColor: "var(--brand-sky)" }}
            >
              View All Photos
            </Button>
          </div>
        </div>
      )}

      {/* Show Less Button */}
      {showAllImages && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
          <Button onClick={() => setShowAllImages(false)} size="lg" variant="outline" className="mb-6">
            Show Less
          </Button>
        </div>
      )}

      {/* Filter Buttons */}
      {showAllImages && (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  variant={filter === cat.id ? "default" : "outline"}
                  className={filter === cat.id ? "text-white" : ""}
                  style={filter === cat.id ? { backgroundColor: "var(--brand-sky)" } : {}}
                >
                  {cat.label} <span className="ml-1.5 opacity-70">({cat.count})</span>
                </Button>
              ))}
            </div>

            <p className="text-center text-slate-600 mt-4">
              Showing {filteredImages.length === 0 ? 0 : startIndex + 1}-
              {Math.min(endIndex, filteredImages.length)} of {filteredImages.length}{" "}
              {filteredImages.length === 1 ? "photo" : "photos"}
            </p>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {showAllImages && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {currentImages.map((image) => (
              <Card
                key={image.url}
                className="overflow-hidden cursor-pointer group hover:shadow-xl transition"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square relative overflow-hidden bg-slate-200">
                  <img
                    src={image.url}
                    alt={image.title || "Gallery photo"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-end p-3">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition">
                      {image.title}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={safePage === 1}
                variant="outline"
              >
                Previous
              </Button>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={safePage === page ? "default" : "outline"}
                    className={safePage === page ? "text-white" : ""}
                    style={safePage === page ? { backgroundColor: "var(--brand-sky)" } : {}}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={safePage === totalPages}
                variant="outline"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:opacity-70 transition p-2"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={36} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition p-3 bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition p-3 bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          <img
            src={selectedImage.url}
            alt={selectedImage.title || "Selected photo"}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full">
            <p className="text-lg font-semibold">
              {selectedImage.title || "Photo"}
              <span className="ml-3 text-sm opacity-70">
                {filteredImages.findIndex((img) => img.url === selectedImage.url) + 1} /{" "}
                {filteredImages.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}