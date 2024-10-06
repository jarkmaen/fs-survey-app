const PageNotFound = () => {
    return (
        <div
            className="align-items-center d-flex flex-column justify-content-center text-center vh-100"
            style={{ marginTop: '-80px' }}
        >
            <h1 style={{ fontWeight: 600 }}>404 - Page not found...</h1>
            <p style={{ fontWeight: 500 }}>
                Sorry, the page you are looking for doesn&apos;t exist or has been removed.
            </p>
        </div>
    )
}

export default PageNotFound
