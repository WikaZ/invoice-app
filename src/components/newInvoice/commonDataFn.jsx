import moment from 'moment';

const dateUtils = {
    validateDate : function(date) {
        return moment(date, 'YYYY-MM-DD').isValid();
    }
};

export default dateUtils;
