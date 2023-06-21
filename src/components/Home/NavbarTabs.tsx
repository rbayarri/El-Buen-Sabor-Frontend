import './NavbarTabs.css'
import {Category} from "../../models/categories/categories.ts";

export default function NavbarTabs(props: { categories: Category[] }) {

    const categories = props.categories;

    return (
        <div className='navbartabs fs-5 position-sticky border-bottom border-2'>
            <ul className="nav justify-content-center">
                {categories.map(c => (
                    <li className="nav-item" key={c.id}>
                        <a href={`#${c.name}`} className="nav-link">{c.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
