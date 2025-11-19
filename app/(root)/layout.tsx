import Navbar from "@/components/Navbar";

type HomeLayoutProps = Readonly<{ children: React.ReactNode }>

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <main>
            <header className="bg-white flex flex-col mb-4">
                <Navbar />               
            </header>
            {children}
        </main>
    )
}

export default HomeLayout;