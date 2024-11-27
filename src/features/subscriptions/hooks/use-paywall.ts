import { useSubscriptionModal } from "@/features/subscriptions/store/use-subscription-modal";

export const usePaywall = () => {
  const subscriptionModal = useSubscriptionModal();

  const shouldBlock = false;

  return {
    isLoading: false,
    shouldBlock,
    triggerPaywall: () => {
      subscriptionModal.onOpen();
    },
  };
};
