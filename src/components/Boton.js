export default function Boton({border,color,size,children,onClick,radius,padding}) {
    return (
        <div>
            <button
                onClick={onClick}
                style={{
                    backgroundColor: color,
                    border,
                    fontSize: size,
                    borderRadius: radius,
                    padding: padding
                }}
            >
                {children}
            </button>
        </div>
    )
}
