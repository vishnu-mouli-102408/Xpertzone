import type { JSX } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useChatActions } from "@/src/store";
import { Button } from "@repo/ui/components/button";
import { useIsMobile } from "@repo/ui/hooks";
import { MessageCircle, Star, Video } from "lucide-react";
import * as motion from "motion/react-client";

export interface ExpertProps {
  id: string;
  name: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  imageUrl: string;
  availability: string;
  specialties: string[];
  bio?: string;
  firstName?: string;
  lastName?: string;
  profilePic?: string;
}

// shadow-[0_1px_1px_rgba(0,0,0,0.05), 0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]

const ExpertCard = ({
  expert,
  ShareButton,
}: {
  expert: ExpertProps;
  ShareButton: JSX.Element;
}) => {
  const isMobile = useIsMobile();
  const { setActiveChat, setShowMobileChat } = useChatActions();
  const router = useRouter();
  return (
    <motion.div
      className="shadow-card cursor-pointer overflow-hidden rounded-xl border border-[#FFFFFF26] bg-gradient-to-br from-[#222222] to-[#1A1F2C] shadow-[inset_0px_0px_20px_0px_#FFFFFF33] backdrop-blur-[30px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3, transition: { duration: 0.3 } }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={expert.imageUrl}
          alt={expert.name}
          className="h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute left-3 top-3">
          <span className="chip rounded-xl border border-white/10 bg-black/50 text-white shadow-sm backdrop-blur-sm">
            {expert.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-1 flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(expert.rating)
                      ? "fill-current"
                      : "opacity-30"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">({expert.reviews})</span>
          </div>
          {ShareButton}
        </div>
        <h3 className="text-lg font-semibold text-white">{expert.name}</h3>
        <p className="mb-3 text-sm text-gray-400">{expert.title}</p>

        <div className="mb-3 flex flex-wrap gap-1">
          {expert.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="chip border border-white/5 bg-[#403E43]/70 text-xs text-gray-200"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-400">Available: </span>
            <span className="font-medium text-gray-300">
              {expert.availability}
            </span>
          </div>
          <div className="text-primary-foreground bg-primary/80 rounded-md px-2 py-1 text-sm font-medium">
            ${expert.hourlyRate}/hr
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => {
              if (location.pathname !== "/user/chats") {
                router.push("/user/chats");
              }
              setActiveChat({
                bio: expert?.bio ?? "",
                firstName: expert?.firstName ?? "",
                id: expert?.id ?? "",
                lastName: expert?.lastName ?? "",
                profilePic: expert?.profilePic ?? "",
              });
              if (isMobile) {
                setShowMobileChat(true);
              }
            }}
            variant="outline"
            size="sm"
            className="flex cursor-pointer items-center justify-center border-white/10 bg-[#221F26] text-gray-300 transition-all duration-300 ease-in-out hover:bg-[#403E43]/50 hover:text-white"
          >
            <MessageCircle className="mr-1 h-4 w-4" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button
            onClick={() => {
              router.push("/user/calls");
            }}
            variant="outline"
            size="sm"
            className="flex cursor-pointer items-center justify-center border-white/10 bg-[#221F26] text-gray-300 transition-all duration-300 ease-in-out hover:bg-[#403E43]/50 hover:text-white"
          >
            <Video className="mr-1 h-4 w-4" />
            <span className="text-xs">Call</span>
          </Button>
        </div>

        <div className="mt-3">
          <Button
            asChild
            className="w-full rounded-lg bg-gradient-to-r from-[#403E43] to-[#221F26] text-white transition-all duration-200 ease-in-out hover:scale-[1.002] hover:border hover:border-[slate-800] hover:opacity-90"
            variant="default"
          >
            <Link href={`/user/expert-profile/${expert.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpertCard;
