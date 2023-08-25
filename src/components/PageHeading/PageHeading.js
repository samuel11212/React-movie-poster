
import s from "../PageHeading/PageHeading.module.css";

const PageHeading=({children})=>{
    return(
        <h2 className={s.heading}>
            {children}
        </h2>
    )
}
export default PageHeading;