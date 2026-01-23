export default function ProfileInfo() {
    return (
        <section className="flex items-center gap-4">
            <div className="avatar">
                <div className="ring-primary w-24 rounded-full ring-2 ring-offset-2">
                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="font-black text-4xl tracking-tight">John Doe</h1>
                <p className="text-base-content/50 font-medium text-lg">
                    john@gmail.com
                </p>
            </div>
            <button className="btn btn-primary rounded-lg ml-auto">
                Modifier mes infos
            </button>
        </section>
    );
}
