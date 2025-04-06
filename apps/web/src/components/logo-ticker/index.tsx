import Icons from "@repo/ui/components/icons";
import MaxWidthWrapper from "@repo/ui/components/max-width-wrapper";
import * as motion from "motion/react-client";

const LogoTicker = () => {
  const companies = [
    Icons.comp1,
    Icons.comp2,
    Icons.comp3,
    Icons.comp4,
    Icons.comp5,
    Icons.comp6,
  ];
  return (
    <section className="bg-gray-950/90 py-16 md:py-20">
      <MaxWidthWrapper className="lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ amount: 0.5 }}
        >
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_0%,transparent)]">
            <motion.div
              animate={{ translateX: "-50%" }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              className="flex flex-none gap-14"
            >
              {[...Array(20)].map((_, index) => (
                <div
                  key={index}
                  className="text-muted-foreground flex h-16 items-center justify-center"
                >
                  {companies?.[index % companies?.length]?.({
                    className: "w-auto h-6",
                  })}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};

export default LogoTicker;
