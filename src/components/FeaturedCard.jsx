import { Chip } from "@heroui/react";
import { Users, ArrowRight } from "lucide-react"; // ArrowRight আইকন যোগ করা হলো
import Image from "next/image";
import Link from "next/link";

const FeaturedCard = ({ course }) => {
    const { _id, thumbnail, title, price, category } = course;

    return (
        <div className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image 
                    src={thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600'}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <Chip size="sm" color="primary" variant="flat" className="font-semibold text-[11px] backdrop-blur-sm bg-white/80">
                        {category}
                    </Chip>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col grow">
                <Link href={`/courses/${_id}`} className="group/link">
                    <h4 className="font-bold text-lg text-slate-800 leading-snug line-clamp-2 group-hover/link:text-blue-600 transition-colors">
                        {title}
                    </h4>
                </Link>
                
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-extrabold text-lg text-blue-600">${price}</span>
                    </div>
                </div>
                
                {/* Optional: Add a subtle 'View Course' button */}
                <Link href={`/courses/${_id}`} className="mt-4 w-full text-center py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2">
                    View Course <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default FeaturedCard;