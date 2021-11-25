export default function Boton({border,color,texto,onClick}) {
    return (
        <div>
            <button
                onClick={onClick}
                style={{
                    backgroundColor: color,
                    color: "#fff",
                    border: "none",
                    fontSize: "17px",
                    borderRadius: "5px",
                    padding: "10px 12px"
                }}
            >
                {texto}
            </button>
        </div>
    )
}
