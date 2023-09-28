import { useParams } from "react-router-dom";

export const DeclarationBlock = () => {
    const { id } = useParams();
    return <h3>Declaration: {id}</h3>;
};
