import { FAQS } from "@/src/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import AnimationContainer from "@repo/ui/components/animation-container";
import MaxWidthWrapper from "@repo/ui/components/max-width-wrapper";
import SectionBadge from "@repo/ui/components/section-badge";

const FAQ = () => {
  return (
    <section
      id="faq"
      className="bg-gradient-to-r from-gray-900 via-stone-950 to-slate-900"
    >
      <MaxWidthWrapper className="py-20 lg:py-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <AnimationContainer animation="fadeUp" delay={0.2}>
            <SectionBadge title="FAQ" />
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.3}>
            <h2 className="from-foreground bg-gradient-to-b to-neutral-500 bg-clip-text text-2xl font-medium !leading-tight text-transparent md:text-4xl lg:text-5xl">
              Answers to All Your Questions
            </h2>
          </AnimationContainer>

          <AnimationContainer animation="fadeUp" delay={0.4}>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base lg:text-lg">
              Get answers to the most common questions and learn how to make the
              most of our services.
            </p>
          </AnimationContainer>
        </div>

        <div className="mx-auto max-w-3xl pt-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, index) => (
              <AnimationContainer
                key={index}
                animation="fadeUp"
                delay={0.5 + index * 0.1}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-2xl border-none bg-[#191919] px-6"
                >
                  <AccordionTrigger className="cursor-pointer py-6 text-left text-base font-normal hover:no-underline md:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-left transition-all duration-300 ease-in-out">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimationContainer>
            ))}
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default FAQ;
