import { Request, Response } from 'express';
import clientService from '../services/client.service';

class ClientController {
  async getAll(req: Request, res: Response) {
    const clients = await clientService.getAll();
    res.json(clients);
  }

  async create(req: Request, res: Response) {
    const client = await clientService.create(req.body);
    res.json(client);
  }
}

export default new ClientController();
