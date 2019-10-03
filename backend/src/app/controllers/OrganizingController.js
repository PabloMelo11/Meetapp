import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class OrganizingController {
  async index(req, res) {
    const page = req.query.page || 1;
    const per_page = req.query.per_page || 7;

    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'title', 'description', 'location', 'date'],
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return res.json(meetups);
  }

  async show(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (meetup.user_id !== req.userId) {
      return res.status(400).json({ erro: 'Unauthorized' });
    }

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    return res.json({
      meetup,
    });
  }
}

export default new OrganizingController();
