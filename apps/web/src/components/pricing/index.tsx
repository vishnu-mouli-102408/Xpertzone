"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRICING_PLANS } from "@/src/constants";
import { useUser } from "@clerk/nextjs";
import NumberFlow from "@number-flow/react";
import AnimationContainer from "@repo/ui/components/animation-container";
import MaxWidthWrapper from "@repo/ui/components/max-width-wrapper";
import SectionBadge from "@repo/ui/components/section-badge";
import { cn } from "@repo/ui/lib/utils";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  return (
    <section
      id="pricing"
      className="bg-gradient-to-r from-[#00002a] to-[#000022]"
    >
      <MaxWidthWrapper className="py-20 lg:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <AnimationContainer animation="fadeUp" delay={0.2}>
            <SectionBadge title="Pricing" />
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.3}>
            <h2 className="from-foreground bg-gradient-to-b to-neutral-400 bg-clip-text text-2xl font-medium !leading-tight text-transparent md:text-4xl lg:text-5xl">
              Choose your perfect plan
            </h2>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.4}>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
              Select the plan that best suits your needs. If you need any
              assistance, feel free to contact us.
            </p>
          </AnimationContainer>
        </div>

        <AnimationContainer animation="fadeUp" delay={0.5}>
          <div className="flex items-center justify-center gap-4 pt-10">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "text-sm font-medium transition-colors",
                !isYearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Monthly
            </button>
            <div
              onClick={() => setIsYearly(!isYearly)}
              className="h-6 w-11 cursor-pointer rounded-full bg-neutral-800 p-1 transition-colors duration-300"
            >
              <div
                className={cn(
                  "from-primary h-4 w-4 rounded-full bg-gradient-to-b to-[#C5B9F6] transition-transform duration-300",
                  isYearly && "translate-x-5"
                )}
              />
            </div>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "text-sm font-medium transition-colors",
                isYearly ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Yearly
            </button>
          </div>
        </AnimationContainer>

        <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <AnimationContainer
              key={index}
              animation="fadeUp"
              delay={0.6 + index * 0.2}
            >
              <div
                className={cn(
                  "transiti relative flex cursor-pointer flex-col overflow-hidden rounded-3xl p-8 backdrop-blur-3xl duration-500 ease-in-out hover:scale-[1.02]",
                  plan.popular &&
                    "relative border border-[#C5B9F666] bg-[#C5B9F60D] shadow-[inset_0px_0px_55.5px_0px_#C5B9F626]",
                  !plan.popular &&
                    "border border-[#C5B9F633] bg-[#FFFFFF03] shadow-[inset_0px_0px_55.5px_0px_#C5B9F626] backdrop-blur-[34px]"
                )}
              >
                <AnimationContainer
                  animation="fadeUp"
                  delay={0.7 + index * 0.2}
                >
                  <div className="mb-8">
                    <h3 className="mb-2 text-xl font-medium">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                  </div>
                </AnimationContainer>

                <AnimationContainer
                  animation="fadeUp"
                  delay={0.8 + index * 0.2}
                >
                  <div className="mb-8 flex items-baseline gap-2">
                    <span className="text-4xl font-medium">$</span>
                    <span className="text-5xl font-medium">
                      <NumberFlow
                        value={
                          isYearly ? plan.price.yearly : plan.price.monthly
                        }
                      />
                    </span>
                    <span className="text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                </AnimationContainer>

                <div className="flex-1">
                  <AnimationContainer
                    animation="fadeUp"
                    delay={0.9 + index * 0.2}
                  >
                    <ul className="mb-8 space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          {feature.included ? (
                            <Check className="text-primary h-5 w-5" />
                          ) : (
                            <X className="text-muted-foreground h-5 w-5" />
                          )}
                          <span
                            className={cn(
                              "text-sm",
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground"
                            )}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AnimationContainer>
                </div>

                <AnimationContainer animation="fadeUp" delay={1 + index * 0.2}>
                  <button
                    onClick={() => {
                      if (isSignedIn) {
                        router.push(
                          `${user?.publicMetadata?.role === "user" ? "/user/" : "/expert"}/billing`
                        );
                      } else {
                        toast.info("Please sign in to continue", {
                          description:
                            "You need to be signed in to access the billing page.",
                          closeButton: true,
                          duration: 5000,
                          position: "bottom-center",
                        });
                      }
                    }}
                    className={`w-full cursor-pointer rounded-xl p-2 transition-all duration-300 ease-in-out hover:scale-[1.02] ${plan.popular ? "border border-[#FFFFFF26] bg-[#FFFFFF0D] shadow-[inset_0px_0px_20px_0px_#FFFFFF33] hover:border hover:border-[#FFFFFF66] hover:bg-[#FFFFFF1A] hover:shadow-[inset_0px_0px_30px_0px_#FFFFFF4D]" : "border border-[#FFFFFF26] shadow-[inset_0px_0px_20px_0px_#FFFFFF33] hover:border hover:border-[#FFFFFF26] hover:bg-[#FFFFFF0D] hover:shadow-[inset_0px_0px_20px_0px_#FFFFFF33]"}`}
                  >
                    Get Started
                  </button>
                </AnimationContainer>
              </div>
            </AnimationContainer>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Pricing;
