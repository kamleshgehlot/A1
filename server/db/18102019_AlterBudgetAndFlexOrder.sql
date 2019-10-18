ALTER TABLE budget ADD paid_day VARCHAR(20) NULL AFTER afford_amt, ADD debited_day VARCHAR(20) NULL AFTER paid_day;
ALTER TABLE flex_order DROP duration;