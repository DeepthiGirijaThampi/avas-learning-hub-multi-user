//CustomButton component is a reusable button component that accets text and an onClick handler
export default function CustomButton({text,onClick}){
    return(
        <button className="add-btn" onClick={onClick}>{text}</button>
    );
}