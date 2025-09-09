import { Company } from "@/api/type/company";
import {
  useSubscriptionMutation,
  useUnsubscriptionMutation,
} from "@/hooks/news/useSubscriptionMutation";
import CompanyInfo from "./CompanyInfo";

interface Props {
  companyInfo: Company;
  className?: string;
  variant?: "main" | "sub" | "company" | "content";
}

function CompanyInfoContainer({ companyInfo, ...props }: Props) {
  const { mutate: subscribe } = useSubscriptionMutation(companyInfo.id);
  const { mutate: unsubscribe } = useUnsubscriptionMutation(companyInfo.id);

  const handleSubscribe = () => {
    if (companyInfo.isSubscribed) unsubscribe();
    else subscribe();
  };

  return (
    <CompanyInfo
      companyInfo={companyInfo}
      onSubscribe={handleSubscribe}
      {...props}
    />
  );
}

export default CompanyInfoContainer;
