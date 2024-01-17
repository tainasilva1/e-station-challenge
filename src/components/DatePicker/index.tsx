import React, { memo, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';
registerLocale('ptBr', ptBr)

const DatePicker = () => {
  const defaultDate = new Date(2021, 0, 1)
  const [dateRange, setDateRange] = useState([defaultDate, null]);
  const [startDate, endDate] = dateRange;

  return (
    <ReactDatePicker
      showIcon
      locale='ptBr'
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDateRange(update)}
      className="bg-white rounded-lg border border-gray-300 z-10 shadow p-4"
      isClearable={true}
      dateFormat="d 'de' MMM 'de' yyy"
    />
  );
}

export default memo(DatePicker);