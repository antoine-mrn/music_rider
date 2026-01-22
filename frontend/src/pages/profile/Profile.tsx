export default function Profile() {
    return (
        <div className="w-full">
            <section className="flex justify-between items-center">
                <div className="flex flex-col items-center gap-1">
                    <h1 className="font-black text-4xl tracking-tight">
                        John Doe
                    </h1>
                    <p>john@gmail.com</p>
                </div>
                <button className="btn btn-active btn-primary">
                    Modifier mes infos
                </button>
            </section>
        </div>
    );
}
