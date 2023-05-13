import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";

import { SafeUser } from "@/types";

type useFavoriteType = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export default function useFavorite({
  listingId,
  currentUser,
}: useFavoriteType) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = React.useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = React.useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorite, listingId, loginModal, router]
  );

  return { hasFavorite, toggleFavorite };
}
