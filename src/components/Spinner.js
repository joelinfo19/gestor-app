export default function Spinner({marginTop = 0 }) {
    return (
        <div className={`d-flex justify-content-center mt-${marginTop}`}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}