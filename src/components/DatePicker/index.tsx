import React, { memo, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';
registerLocale('ptBr', ptBr)

type Props = {
  onDateChange: (start: Date | null, end: Date | null) => void;
}
const DatePicker = ({ onDateChange }: Props) => {
  const defaultDate = new Date(2021, 0, 1)
  const [dateRange, setDateRange] = useState([defaultDate, null]);
  const [startDate, endDate] = dateRange;

  const handleChangeDate = (date: [Date | null, Date | null]) => {
    const [startDate, endDate] = date;
    setDateRange(date);
    onDateChange(startDate, endDate);
  }

  return (
    <ReactDatePicker
      data-testid='date-picker'
      showIcon
      locale='ptBr'
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={handleChangeDate}
      className="bg-white rounded-lg border border-gray-300 z-10 shadow p-4"
      isClearable={true}
      dateFormat="d 'de' MMM 'de' yyy"
    />
  );
}

export default memo(DatePicker);