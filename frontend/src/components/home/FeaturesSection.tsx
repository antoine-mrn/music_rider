import { Grid2x2 } from "lucide-react";
import HomeCard from "./HomeCard";

export default function FeaturesSection() {
    return (
        <section className="flex place-items-center flex-col">
            <h2 className="text-4xl font-bold md:text-5xl text-base-content">
                L'outil tout-en-un des pros
            </h2>
            <p className="text-xl text-base-content/50 leading-relaxed mb-10">
                Une interface pensée pour la rapidité sur le terrain, en
                coulisses ou en studio.
            </p>

            <ul className="flex flex-col lg:flex-row">
                <HomeCard>
                    <div className="bg-primary/8 w-fit p-3 rounded-xl">
                        <Grid2x2
                            color="var(--color-primary)"
                            size={36}
                            strokeWidth={2}
                        />
                    </div>
                    <p>
                        A card component has a figure, a body part, and inside
                        body there are title and actions parts
                    </p>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </HomeCard>
            </ul>
        </section>
    );
}
