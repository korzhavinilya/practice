import Client from '../entities/client.entity';
import dataSource from '../typeorm-db';

class ClientService {
  async getAll() {
    const clientRepository = dataSource.getRepository(Client);
    const clients = await clientRepository.find({ relations: ['roles'] });
    return {
      total: clients.length,
      clients,
    };
  }

  async create(client: Client) {
    const clientRepository = dataSource.getRepository(Client);
    const entity = clientRepository.create(client);
    return clientRepository.save(entity);
  }
}

export default new ClientService();
