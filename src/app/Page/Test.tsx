import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Label } from '@mui/icons-material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState } from 'react';

export default function TestPage() {
    const [mainSelect, setMainSelect] = React.useState('');
    const [showTextField, setShowTextField] = useState(false);
    const [fieldValue, setFieldValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');

    const handleSelectChange = (event: SelectChangeEvent) => {
        setMainSelect(event.target.value);
        if (event.target.value === 'Select') {
            setShowTextField(true);
        } else {
            setShowTextField(false)
        }
    }

    const handleFieldValueChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFieldValue(e.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setSubmittedValue(fieldValue);
        console.log(fieldValue)
        // setFormSubmitted(true)
        // console.log('Submitted value:', fieldValue);
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} >
                <InputLabel id="demo-simple-select-standard-label">Select</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={mainSelect}
                    onChange={handleSelectChange}
                    label="Select"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Select">Select</MenuItem>
                    <MenuItem value="Text">Text</MenuItem>
                    <MenuItem value="Email">Email</MenuItem>
                </Select>
                {showTextField && (
                    <label>
                        Options:
                        <input type="text" value={fieldValue} onChange={handleFieldValueChange} />
                        <button type='submit' onSubmit={handleSubmit}>Add</button>
                    </label>

                )}
                {submittedValue && (
                    <div>
                        You submitted: {submittedValue}
                    </div>
                )}

            </FormControl>

        </div>
    );
}
