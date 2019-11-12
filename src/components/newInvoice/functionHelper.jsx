import moment from 'moment';

const dateUtils = {
    validateDate : function(date) {
        return moment(date).isValid();
    }
};

export default dateUtils;
