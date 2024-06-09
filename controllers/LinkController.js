import {Link} from "../models/LinkModel.js";
const LinkController = {
  getList: async (req, res) => {
    try {
      const links = await Link.find({});
      res.json(links);
      console.log(links);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  redicateById: async (req, res) => {
    const id = req.params.id;
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    try {
        const link = await Link.findById(id);
        const value = req.query[link.targetParamName] ||'';
        if (link) {
            link.clicks.push({
                insertedAt: Date.now(),
                ipAddress: ipAddress,
                targetParamValue:value
            });
            await link.save();
            console.log("success");
            console.log(link);
            res.redirect(link.originalUrl);
        } else {
            res.status(404).send('Link not found');
        }
    } catch (e) {
        console.log('Error');
        console.log(e.message);
        res.status(500).send(e.message);
    }
  },
  distributionByClicks: async (req,res)=>{
    const id = req.params.id;
    try {
        const link = await Link.findById(id);
        if (!link) {
            return res.status(404).send('link not found');
        }

        const targetValueMap = link.targetValues.reduce((acc, target) => {
            acc[target.value] = target.name;
            return acc;
        }, {});

        const clickData = link.clicks.reduce((acc, click) => {
            const targetValue = click.targetParamValue || 'unknown';
            const targetName = targetValueMap[targetValue] || 'unknown';
            acc[targetName] = (acc[targetName] || 0) + 1;
            return acc;
        }, {});

        res.json(clickData);
    } catch (err) {
        res.status(500).send('Server error');
    }
  },
  add: async (req, res) => {
    try {
      const newLink = await Link.create(req.body);
      res.json(newLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  update: async (req, res) => {
    try {
      const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, {new:true});
      res.json(updatedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deletedLink = await Link.findByIdAndDelete(req.params.id);
      res.json(deletedLink);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },
};

export default LinkController;
