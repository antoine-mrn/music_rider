import { motion } from "motion/react";
import { forwardRef, type ReactNode } from "react";

interface HomeCardProps {
    children: ReactNode;
}
const HomeCard = forwardRef<HTMLLIElement, HomeCardProps>(
    ({ children }, ref) => {
        return (
            <motion.li
                ref={ref}
                className="card bg-base-100 card-lg shadow-xl rounded-2xl hover:shadow-2xl transition-shadow border border-base-200"
            >
                <div className="card-body">{children}</div>
            </motion.li>
        );
    },
);

export default HomeCard;
