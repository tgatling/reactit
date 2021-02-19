import {ForumState} from './store';
import {AppAction, getAllBanned} from './actions';
import {ThunkAction} from 'redux-thunk';
import emailService from '../user/email/email.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ForumState, unknown, AppAction>;
/**
 * BETA: NOT YET IMPLEMENTED
 * Placeholder for an email service handler.
 */
export const thunkGetEmails = (): AppThunk => async dispatch => {
    const asyncResp = await emailService.getAllBanned();
    console.log('before thunk dispatch');
    dispatch(getAllBanned(asyncResp));
}