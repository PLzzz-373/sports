import { ElForm, ElDialog, ElTree } from "element-plus";
import { FormItemRule } from "element-plus";

export type IElForm = InstanceType<typeof ElForm>;
export type IElDialog = InstanceType<typeof ElDialog>;
export type IElTree = InstanceType<typeof ElTree>;

export type IFormRule = Record<string, FormItemRule[]>;
