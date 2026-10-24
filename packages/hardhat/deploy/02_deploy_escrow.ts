// 02_deploy_escrow.ts
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployEscrow: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const arbiter = process.env.ESCROW_ARBITER ?? "";

  if (!hre.ethers.isAddress(arbiter) || arbiter === hre.ethers.ZeroAddress) {
    throw new Error("请在当前终端 export ESCROW_ARBITER=<有效仲裁人地址>");
  }

  await hre.deployments.deploy("Escrow", {
    from: deployer,
    args: [arbiter],
    log: true,
    autoMine: true,
  });
};

export default deployEscrow;

deployEscrow.tags = ["EscrowCMH202430550166"];
