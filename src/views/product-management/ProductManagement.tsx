import { useParams } from "react-router-dom"

export const ProductManagement = () => {
    const { category } = useParams();
    return (
        <div>
            <h1>ProductManagement</h1>
            <h4>Category: {category}</h4>
        </div>
    )
}