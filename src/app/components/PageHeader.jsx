import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import { getUserBookmarks, addUserBookmark, removeUserBookmark } from "@/app/_db/srvactions/user";
import BackNavBtn from '@/app/components/BackNavBtn';
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";

export default function PageHeader({ title, disableBack = false }) {
    const [bookmarks, setBookmarks] = useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        getUserBookmarks().then((data) => {
            setBookmarks(data);
            // Check if the current URL with search params is in the bookmarks
            const currentUrl = `${pathname}?${searchParams.toString()}`;
            setIsBookmarked(data.find(b => b.link === currentUrl) ? true : false);
        });
    }, [pathname, searchParams]);

    const handleBookmarkToggle = () => {
        const currentUrl = `${pathname}?${searchParams.toString()}`;
        
        if (isBookmarked) {
            if (!confirm("Are you sure you want to remove this bookmark?")) {
                return;
            }
            removeUserBookmark(currentUrl).then((data) => {
                setBookmarks(data);
                setIsBookmarked(false);
            });
        } else {
            const label = prompt("Enter bookmark label:");
            if (label == null) {
                return;
            }
            addUserBookmark(currentUrl, label).then((data) => {
                setBookmarks(data);
                setIsBookmarked(true);
            });
        }
    };

    return (
        <div className="pageHeader">
            {!disableBack && <BackNavBtn id="headerBack" />}
            <h1 className="pageTitle">{title}</h1>
            <div className="bookmarkContainer">
                <BookmarkButton isBookmarked={isBookmarked} onToggle={handleBookmarkToggle} />
            </div>
        </div>
    );
}

function BookmarkButton({ isBookmarked, onToggle }) {
    return (
        <button onClick={onToggle}>
            {isBookmarked ? <MdBookmark id="bookmark" /> : <MdBookmarkBorder id="bookmark" />}
        </button>
    );
}

