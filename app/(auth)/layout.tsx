type AppLayoutProps = Readonly<{ children: React.ReactNode }>

const AuthLayout = ({children} : AppLayoutProps) => {
    <main>
        Auth Root Layout
        {children}
    </main>
}

export default AuthLayout;