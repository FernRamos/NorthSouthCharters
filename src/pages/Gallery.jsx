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

  // --- Helper: normalize any url into "/images/filename.ext"
  const normalizeUrl = useCallback((url) => {
    if (!url) return url;
    if (url.startsWith("/images/")) return url;
    if (url.startsWith("https://www.nscharters.com/images/")) {
      return url.replace("https://www.nscharters.com", "");
    }
    if (url.startsWith("images/")) return `/${url}`;

    const looksLikeFile =
      /\.(png|jpe?g|webp|gif|svg)$/i.test(url) && !url.includes("/");
    if (looksLikeFile) return `/images/${url}`;

    return url;
  }, []);

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

  // ✅ CATEGORY COUNTS — FIXED
  const categories = useMemo(() => {
    const all = normalizedImages;

    const isGrouper = (img) => img.category === "Grouper";

    return [
      { id: "all", label: "All Photos", count: all.length },
      { id: "redfish", label: "Redfish", count: all.filter(i => i.title === "Redfish").length },
      { id: "grouper", label: "Grouper", count: all.filter(isGrouper).length },
      { id: "snook", label: "Snook", count: all.filter(i => i.title === "Snook").length },
      {
        id: "trout",
        label: "Speckled Trout",
        count: all.filter(i => i.title === "Speckled Trout").length,
      },
      {
        id: "other-fish",
        label: "Other Fish",
        count: all.filter(
          (i) =>
            i.category === "catches" &&
            !["Redfish", "Snook", "Speckled Trout"].includes(i.title) &&
            !isGrouper(i)
        ).length,
      },
      { id: "scalloping", label: "Scalloping", count: all.filter(i => i.category === "scalloping").length },
      { id: "wildlife", label: "Wildlife", count: all.filter(i => i.category === "wildlife").length },
    ];
  }, [normalizedImages]);

  // ✅ FILTER LOGIC — FIXED
  const filteredImages = useMemo(() => {
    const all = normalizedImages;

    if (filter === "all") return all;
    if (filter === "redfish") return all.filter(i => i.title === "Redfish");
    if (filter === "grouper") return all.filter(i => i.category === "Grouper");
    if (filter === "snook") return all.filter(i => i.title === "Snook");
    if (filter === "trout") return all.filter(i => i.title === "Speckled Trout");
    if (filter === "other-fish")
      return all.filter(
        (i) =>
          i.category === "catches" &&
          !["Redfish", "Snook", "Speckled Trout"].includes(i.title) &&
          i.category !== "Grouper"
      );

    return all.filter((img) => img.category === filter);
  }, [filter, normalizedImages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil(filteredImages.length / imagesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = filteredImages.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage !== safePage) setCurrentPage(safePage);
  }, [currentPage, safePage]);

  const goToNext = useCallback(() => {
    if (!selectedImage || filteredImages.length === 0) return;
    const i = filteredImages.findIndex(img => img.url === selectedImage.url);
    setSelectedImage(filteredImages[(i + 1) % filteredImages.length]);
  }, [filteredImages, selectedImage]);

  const goToPrevious = useCallback(() => {
    if (!selectedImage || filteredImages.length === 0) return;
    const i = filteredImages.findIndex(img => img.url === selectedImage.url);
    setSelectedImage(filteredImages[(i - 1 + filteredImages.length) % filteredImages.length]);
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
      {/* ⬇️ EVERYTHING BELOW IS UNCHANGED JSX ⬇️ */}
      {/* (Hero, Featured, Filters, Grid, Pagination, Modal) */}
    </div>
  );
}