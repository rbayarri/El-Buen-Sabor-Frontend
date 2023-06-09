import {FormField} from "./FormField.tsx";

type FormFieldProps = {
    type: string
    classes: string,
    id: string,
    placeholder: string,
    error: string | undefined,
    touched: boolean | undefined
}

export const FormFieldWithMessage = ({type, classes, id, placeholder, error, touched}: FormFieldProps) => {

    return (
        <>
            <FormField type={type} classes={classes} id={id} placeholder={placeholder}/>
            {
                (error && touched) && (
                    <div className="invalid-feedback d-block" style={{whiteSpace: "pre-wrap"}}>
                        {error}
                    </div>
                )
            }
        </>
    )
}
