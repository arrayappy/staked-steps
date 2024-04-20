import express from 'express';
import config from './config.js';
import nftRouter from './routes/nft.routes.js';
import baseContractJson from '../artifacts/contracts/BaseContract.sol/BaseContract.json' assert { type: 'json' };
import cron from "node-cron";
import { decideWinnersCron } from './services/cron.service.js'

cron.schedule('* * * * *', async () => {
  await decideWinnersCron();
});

const app = express();
const port = config.PORT;

app.get('/', (req, res) => {
  res.send('Not Dead!');
});

app.use('/nft', nftRouter);

// to dynamically get recent ABI and CONTRACT_ADDRESS in the frontend
// ABI and contract address are needed to interact with smart contract functions from any web3 client.
app.get('/contract-info', (req, res) => {
  return res.json({
    address: config.CONTRACT_ADDRESS,
    abi: baseContractJson.abi,
  });
});

app.get('/mockChallenges', (req, res) => {
  res.json({
    challenges: [
      {
        challengeName: 'Challenge #1',
        startDate: 1713004804235,
        endDate: 1713004804235,
        totalDays: 10,
        stakedAmount: 0.1,
        totalParticipants: 10,
        participants: [
          {
            name: 'Apple',
            daysCompleted: 4,
          },
          {
            name: 'Mohan',
            daysCompleted: 5,
          },
          {
            name: 'Vijay',
            daysCompleted: 3,
          },
        ],
      },

      {
        challengeName: 'Challenge #1',
        startDate: 1713004804235,
        endDate: 1713004804235,
        totalDays: 10,
        stakedAmount: 0.1,
        totalParticipants: 10,
        participants: [
          {
            name: 'Apple',
            daysCompleted: 4,
          },
          {
            name: 'Mohan',
            daysCompleted: 5,
          },
          {
            name: 'Vijay',
            daysCompleted: 3,
          },
        ],
      },

      {
        challengeName: 'Challenge #1',
        startDate: 1713004804235,
        endDate: 1713004804235,
        totalDays: 10,
        stakedAmount: 0.1,
        totalParticipants: 10,
        participants: [
          {
            name: 'Apple',
            daysCompleted: 4,
          },
          {
            name: 'Mohan',
            daysCompleted: 5,
          },
          {
            name: 'Vijay',
            daysCompleted: 3,
          },
        ],
      },
    ],
  });
});

app.listen(port, () => {
  console.log('backend is running on PORT:: ' + port);
});
