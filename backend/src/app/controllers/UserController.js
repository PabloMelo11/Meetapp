import User from '../models/User';

class UserController {
  async store(req, res) {
    /**
     * Verify user already exists
     */

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'E-mail already registered' });
    }

    /**
     * Create user
     */
    const { id, name, email } = await User.create(req.body);

    return res.json({
      user: {
        id,
        name,
        email,
      },
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    /**
     * Verify e-mail
     */
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'E-mail already registered' });
      }
    }

    /**
     * Verify oldPassword === password
     */
    if (oldPassword && !(await user.chechPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
