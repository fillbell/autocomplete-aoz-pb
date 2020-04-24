'use babel';

import basicProvider from './basic-provider';
import intermediateProvider from './intermediate-provider';

export default {
    getProvider() {
        return [basicProvider, intermediateProvider];
    }
};
