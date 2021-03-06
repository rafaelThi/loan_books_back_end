/* eslint-disable array-callback-return */
import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import HistoryRequest from '../models/HistoryRequest';
import HistoryRepo from '../Repositories/HistoryRepository';

const historyAccept = Router();

historyAccept.post('/history-accepts', async (request, response) => {
  const historyRepo = getRepository(HistoryRequest);
  const {
    id_request_accept, id_request, id_book, id_user, id_admin, created_at, name_book, name_user,
    message, delivered,
  } = request.body;

  const history = await historyRepo.create({
    id_request_accept,
    id_request,
    name_book,
    id_book,
    name_user,
    id_user,
    id_admin,
    created_at,
    message,
    delivered,
  });

  await historyRepo.save(history);
  return response.json({ history });
});

historyAccept.get('/history-all/:id_admin', async (request, response) => {
  const historyRepo = getCustomRepository(HistoryRepo);
  const { id_admin } = request.params;
  const history_accept = await historyRepo.listAll(id_admin);
  return response.json(history_accept);
});

historyAccept.get('/history-books/:id_admin/:name_book', async (request, response) => {
  const { id_admin, name_book } = request.params;
  const historyRepo = getCustomRepository(HistoryRepo);
  const history_nameBook = await historyRepo.listHistoryBookName(name_book, id_admin);
  return response.json(history_nameBook);
});

historyAccept.get('/history-user/:id_admin/:name_user', async (request, response) => {
  const { id_admin, name_user } = request.params;
  const historyRepo = getCustomRepository(HistoryRepo);
  const history_nameUser = await historyRepo.listHistoryUserName(name_user, id_admin);
  return response.json(history_nameUser);
});

export default historyAccept;
