import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { images, featuredImages } from '../components/data/galleryImages';

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAllImages, setShowAllImages] = useState(false);
    const imagesPerPage = 20;

    const categories = [
        { id: 'all', label: 'All Photos', count: images.length },
        { id: 'redfish', label: 'Redfish', count: images.filter(i => i.title === 'Redfish').length },
        { id: 'grouper', label: 'Grouper', count: images.filter(i => i.title === 'Grouper').length },
        { id: 'snook', label: 'Snook', count: images.filter(i => i.title === 'Snook').length },
        { id: 'trout', label: 'Speckled Trout', count: images.filter(i => i.title === 'Speckled Trout').length },
        { id: 'other-fish', label: 'Other Fish', count: images.filter(i => i.category === 'catches' && !['Redfish', 'Grouper', 'Snook', 'Speckled Trout'].includes(i.title)).length },
        { id: 'scalloping', label: 'Scalloping', count: images.filter(i => i.category === 'scalloping').length },
        { id: 'wildlife', label: 'Wildlife', count: images.filter(i => i.category === 'wildlife').length }
    ];

    const filteredImages = filter === 'all' 
        ? images 
        : filter === 'redfish' 
        ? images.filter(img => img.title === 'Redfish')
        : filter === 'grouper'
        ? images.filter(img => img.title === 'Grouper')
        : filter === 'snook'
        ? images.filter(img => img.title === 'Snook')
        : filter === 'trout'
        ? images.filter(img => img.title === 'Speckled Trout')
        : filter === 'other-fish'
        ? images.filter(img => img.category === 'catches' && !['Redfish', 'Grouper', 'Snook', 'Speckled Trout'].includes(img.title))
        : images.filter(img => img.category === filter);

    const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const currentImages = filteredImages.slice(startIndex, endIndex);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    const goToNext = () => {
        const currentIndex = filteredImages.findIndex(img => img.url === selectedImage.url);
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
    };

    const goToPrevious = () => {
        const currentIndex = filteredImages.findIndex(img => img.url === selectedImage.url);
        const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
        setSelectedImage(filteredImages[prevIndex]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'Escape') setSelectedImage(null);
    };

    React.useEffect(() => {
        if (selectedImage) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedImage, filteredImages]);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-6">Photo Gallery</h1>
                    <p className="text-xl text-blue-100">
                        Recent trips, catches, and adventures with NS Charters
                    </p>
                </div>
            </div>

            {/* Featured Images */}
            {!showAllImages && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Featured Catches</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {featuredImages.map((image, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden cursor-pointer group hover:shadow-2xl transition"
                                onClick={() => setSelectedImage(image)}
                            >
                                <div className="aspect-square relative overflow-hidden bg-slate-200">
                                    <img
                                        src={image.url}
                                        alt={image.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                    />
                                    {image.title && (
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                             <span className="text-white font-bold text-xl">
                                                 {image.title}
                                             </span>
                                         </div>
                                     )}
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Expand Button */}
                    <div className="text-center mb-8">
                        <Button
                            onClick={() => setShowAllImages(true)}
                            size="lg"
                            className="text-white font-semibold"
                            style={{ backgroundColor: 'var(--brand-sky)' }}
                        >
                            View All Photos
                        </Button>
                    </div>
                </div>
            )}

            {/* Show Less Button */}
            {showAllImages && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
                    <Button
                        onClick={() => setShowAllImages(false)}
                        size="lg"
                        variant="outline"
                        className="mb-6"
                    >
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
                                    variant={filter === cat.id ? 'default' : 'outline'}
                                    className={filter === cat.id ? 'text-white' : ''}
                                    style={filter === cat.id ? { backgroundColor: 'var(--brand-sky)' } : {}}
                                >
                                    {cat.label} <span className="ml-1.5 opacity-70">({cat.count})</span>
                                </Button>
                            ))}
                        </div>
                        <p className="text-center text-slate-600 mt-4">
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredImages.length)} of {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
                        </p>
                    </div>
                </div>
            )}

            {/* Gallery Grid */}
            {showAllImages && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {currentImages.map((image, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden cursor-pointer group hover:shadow-xl transition"
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="aspect-square relative overflow-hidden bg-slate-200">
                                <img
                                    src={image.url}
                                    alt={image.title}
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
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            variant="outline"
                        >
                            Previous
                        </Button>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <Button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    variant={currentPage === page ? 'default' : 'outline'}
                                    className={currentPage === page ? 'text-white' : ''}
                                    style={currentPage === page ? { backgroundColor: 'var(--brand-sky)' } : {}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                        <Button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
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
                    
                    {/* Previous Button */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition p-3 bg-black/50 rounded-full"
                        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    {/* Next Button */}
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition p-3 bg-black/50 rounded-full"
                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                        aria-label="Next image"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <img
                        src={selectedImage.url}
                        alt={selectedImage.title}
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full">
                        <p className="text-lg font-semibold">
                            {selectedImage.title} 
                            <span className="ml-3 text-sm opacity-70">
                                {filteredImages.findIndex(img => img.url === selectedImage.url) + 1} / {filteredImages.length}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}