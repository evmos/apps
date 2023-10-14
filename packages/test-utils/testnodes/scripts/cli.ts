import { logger } from "testnodes/utils/logger";
import { createCosmosTestnet, createEvmosTestnet, setupTestnet } from ".";
import Table from "cli-table";

await setupTestnet({ enableLogging: true });
