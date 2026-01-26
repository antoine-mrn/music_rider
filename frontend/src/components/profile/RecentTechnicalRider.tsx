import SectionTitle from "../ui/typography/SectionTitle";

export default function RecentTechnicalRider() {
    return (
        <section>
            <SectionTitle title="Fiches techniques récentes" />

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="uppercase">
                            <th>Projet</th>
                            <th>Catégorie</th>
                            <th>Dernière modif.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th className="italic font-bold">SMBU</th>
                            <td className="font-medium uppercase">Scène</td>
                            <td>Il y a 2 jours</td>
                            <td className="link link-primary link-hover">
                                Ouvrir
                            </td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th className="italic font-bold">Psyllium</th>
                            <td className="font-medium uppercase">Bar</td>
                            <td>Il y a 1 mois</td>
                            <td className="link link-primary link-hover">
                                Ouvrir
                            </td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th className="italic font-bold">Nox Vale</th>
                            <td className="font-medium uppercase">Festival</td>
                            <td>Il y a 2 semaines</td>
                            <td className="link link-primary link-hover">
                                Ouvrir
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}
