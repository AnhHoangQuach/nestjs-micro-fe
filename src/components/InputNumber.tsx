import React from 'react';
import { NumericFormat } from 'react-number-format';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InputNumber = React.forwardRef(({ onChange, ...props }: any, ref) => (
  <NumericFormat
    getInputRef={ref}
    allowNegative={false}
    decimalScale={0}
    onValueChange={({ floatValue }) => {
      onChange({ target: { value: floatValue } });
    }}
    {...props}
  />
));

export default InputNumber;
