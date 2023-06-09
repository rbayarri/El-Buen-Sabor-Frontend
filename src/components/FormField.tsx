import {Field} from "formik";

type FormFieldProps = {
    type: string
    classes: string,
    id: string,
    placeholder: string,
}
export const FormField = ({type, classes, id, placeholder}: FormFieldProps) => {
    return (
        <Field className={classes}
               id={id}
               type={type}
               placeholder={placeholder}
               name={id}/>
    )
}