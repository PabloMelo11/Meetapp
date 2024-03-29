import { Op } from 'sequelize';
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    if (req.query.date) {
      const serachDate = parseISO(req.query.date);

      where.date = {
        [Op.between]: [startOfDay(serachDate), endOfDay(serachDate)],
      };
    }

    const meetups = await Meetup.findAll({
      where,
      order: ['date'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });
    return res.json(meetups);
  }

  async store(req, res) {
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    const checkMeetups = await Meetup.findOne({
      where: {
        date: req.body.date,
      },
    });

    if (checkMeetups) {
      return res.status(400).json({ error: 'Meetup date is not available' });
    }

    const meetup = await Meetup.create({
      ...req.body,
      user_id: req.userId,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Meetup date invalid' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups." });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async destroy(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not found' });
    }

    if (meetup.user_id !== user_id) {
      return res.status(401).json({ error: 'Not Authorization' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups" });
    }
    await meetup.destroy();

    return res.json({ message: 'Meetup deleted' });
  }
}

export default new MeetupController();
