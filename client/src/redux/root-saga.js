import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas'

import { userDBSagas } from './user-db/user-db.sagas'
import { projectSagas } from './projects/projects.sagas'
import { ticketSagas } from './tickets/tickets.sagas'

export default function* rootSaga() {
    yield all([call(userSagas), call(userDBSagas), call(projectSagas), call(ticketSagas) ]);
}