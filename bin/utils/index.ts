// import { message } from 'antd';
import { isFunction, isRegExp } from 'lodash';
import moment from 'moment';

/**
 * 判空方法
 * @param value 传入的文字
 *
 */
function judgment(value: string | undefined) {
    if (!value || value === 'undefined') {
        return '';
    }
    return value;
}
/**
 *
 * @param data
 * @param childName
 * @returns 扁平化数组 - 不使用深拷贝会影响数据源
 */
function cutTree(data: any, childName = 'submenus') {
    const result = [];

    while (data.length != 0) {
        const shift = data.shift();
        const children = shift[childName];
        delete shift[childName];
        result.push(shift);

        if (children) {
            children.forEach((item: any) => {
                data.push(item);
            });
        }
    }
    return result;
}

/**
 * 数组转Map
 * @param data
 * @param key
 * @returns
 */
type ArrToMapParams = {
    data: any[];
    children?: string;
    mapKey: string;
    map?: Map<any, any>;
};
export function arrToMap({ data = [], children, mapKey, map = new Map() }: ArrToMapParams) {
    if (data?.length) {
        data.forEach((item) => {
            map.set(item?.[mapKey], item);
            if (children && item?.[children]) {
                arrToMap({ data: item?.[children], children, mapKey, map });
            }
        });
    }
    return map;
}

/**
 *
 * @param data 枚举值
 * @param key key文本
 * @param value value文本
 * @eg:
 *  const dataTypeEnum = {
        1: '流量',
        2: '短信',
    };
    const dataTypeEnum = [
        {
            label: '流量',
            value: 1,
        },
        {
            label: '语音',
            value: 2,
        },
    ];
 * @returns
 */
function enumConversionList(data: object, key = 'label', value = 'value') {
    return Object.entries(data).map((item) => {
        return Object.assign({
            [key]: item[1],
            [value]: item[0],
        });
    });
}

const filterKeyArrList = (arr: any[], key = 'id') => {
    const some: any = [];
    arr.forEach((el) => {
        if (!some.some((e: any) => e[key] == el[key])) {
            some.push(el);
        }
    });
    return some;
};
/**
 * 获取字符串像素宽度
 * @param str
 * @param font_size
 * @returns
 */
export function getLenPx(str: string, font_size = 14) {
    if (!str) return 0;
    const str_leng = str.replace(/[^x00-xff]/gi, 'aa').length;
    return (str_leng * font_size) / 2;
}

/**
 * 字符串脱敏
 * @param str
 * @param type
 * @returns
 */
export function getEncryptStr(
    str: string | undefined,
    type: 'phone' | 'mobile' | 'idCard' | 'name',
) {
    if (!str) return null;
    switch (type) {
        case 'phone':
        case 'mobile':
            return str.replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2');
        case 'idCard':
            return str.replace(/^(.{6})(?:\d+)(.{2})$/, '$1**********$2');
        case 'name':
            if (null != str && str != undefined) {
                if (str.length == 2) {
                    return str.substring(0, 1) + '*'; //截取name 字符串截取第一个字符，
                } else if (str.length == 3) {
                    return str.substring(0, 1) + '*' + str.substring(2, 3); //截取第一个和第三个字符
                } else if (str.length > 3) {
                    return str.substring(0, 1) + '*' + '*' + str.substring(3, str.length); //截取第一个和大于第4个字符
                }
            }
            return null;
        default:
            return null;
    }
}
/**
 * RMB金额格式化
 * @param amount
 * @param showIcon
 * @returns
 */
export function formatRMB(amount?: number | bigint | string, showIcon = true): string {
    const formatter = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
    });
    if (!showIcon)
        return formatter
            .format(Number(isNaN(amount as number) ? 0 : amount))
            ?.replace(/[¥￥$]/g, '');
    return formatter.format(Number(isNaN(amount as number) ? 0 : amount));
}

/**
 * 四舍五入
 * @param number
 * @param precision 精度
 * @returns
 */
export function formatNumber(number: number, precision = 2) {
    return Math.round(number + 'e' + precision) / Math.pow(10, precision);
}

/**
 * 格式化百分比
 * @param number
 * @returns
 */
export function formatPercentage(number?: number | string) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(Number(number ?? 0));
}

/**
 * 格式化银行卡号
 * @param str
 * @returns
 */
export function formatBankCard(str?: string): string {
    if (!str) return '';
    return str.replace(/(\d{4})(?=\d)/g, '$1 ');
}

// 获取树形数据
export const getTreeOption = ({
    data = [],
    valueKey = 'id',
    labelKey = 'name',
    childName = 'children',
}) => {
    if (!data) return [];
    return data.map((item) => {
        const res = Object.assign(item, {
            value: item?.[valueKey],
            // title: item?.[labelKey],
            label: item?.[labelKey],
        });
        if (childName !== 'children' && item?.[childName]) {
            Object.assign(res, { children: item?.[childName] });
        }
        getTreeOption({
            data: item?.children,
            valueKey,
            labelKey,
            childName,
        });
        return res;
    });
};
function getUrlParam(url: string) {
    const query = {};
    if (url.indexOf('?') != -1) {
        const str = url.substr(1);
        const pairs = str.split('&');
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            query[pair[0]] = pair[1];
        }
    }
    return query; // 返回对象
}

// 获取父节点
const getTreeIds = (tree: any, nodeId: any, config: any) => {
    const { children = 'children', id = 'id' } = config || {};
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const toFlatArray = (tree: any, parentId?: any) => {
        return tree.reduce((t: any, _: any) => {
            const child = _[children];
            return [
                ...t,
                parentId ? { ..._, parentId } : _,
                ...(child && child.length ? toFlatArray(child, _[id]) : []),
            ];
        }, []);
    };
    const getIds = (flatArray: any) => {
        let ids = [nodeId];
        let child = flatArray.find((_: any) => _[id] === nodeId);
        while (child && child.parentId) {
            ids = [child.parentId, ...ids];
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            child = flatArray.find((_: any) => _[id] === child.parentId);
        }
        return ids;
    };
    return getIds(toFlatArray(tree));
};

type Types = 'ip' | 'custom' | 'bankCard';
type OptionType = {
    rule: RegExp | ((value?: string) => boolean);
    rejectText: string;
};

// 表单校验
export function validatorFn(
    value: string,
    type: Types,
    options?: OptionType[],
    callback?: Function,
) {
    if (!value) return Promise.reject('请输入');
    const ruleMap: Record<Types, OptionType[]> = {
        ip: [
            {
                rule: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
                rejectText: '输入的IP地址或网段不合法',
            },
        ],
        bankCard: [
            {
                rule: /^(?:62|88|99|19\d{2}|4\d{3}|5[1-5]\d{2}|6\d{3}|81\d{2})\d{10}|^62\d{12,17}|^[0-9]{16,19}$/,
                rejectText: '请输入正确的银行卡号',
            },
        ],
        custom: options ?? [],
    };
    for (const { rule, rejectText } of ruleMap?.[type]) {
        if ((isRegExp(rule) && !rule?.test(value)) || (isFunction(rule) && !rule(value))) {
            callback?.(rejectText);
            return Promise.reject(rejectText);
        }
    }
    callback?.();
    return Promise.resolve();
}

// 对象转query字符串的方法
export function formatPayLoadQuery(obj: any) {
    // 首先判断obj是否为真，为真则进行处理，不然直接return
    if (obj) {
        // 定义变量接收query字符串
        let query = '';
        // 循环遍历对象
        for (const i in obj) {
            // 定义变量接收对象的value值
            let value = obj[i];
            // 若对象的value值为数组，则进行join打断
            if (Array.isArray(value)) {
                value = value.join(',');
            }
            // 进行字符串拼接
            query += `&${i}=${value}`;
        }
        // replace返回一个新的字符串，要用query重新接受一下，并把第一个&替换为?
        query = query.replace('&', '?');
        // 返回生成的query字符串
        return query;
    }
    return '';
}

// 复制文本
export const copyText = (value: any) => {
    const oInput = document.createElement('input');
    oInput.value = value;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    // message.success(`${value}复制成功`);
    oInput.remove();
};

/**
 * 下载模板
 * @param e
 * @param url
 */
export function downloadTemplate(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string,
    title: string = '模板文件.xlsx',
) {
    e.nativeEvent.stopImmediatePropagation();
    fetch(url, {
        method: 'get',
        // responseType: 'blob',
    })
        .then((res) => {
            // 获取blob文件流
            return res.blob();
        })
        .then((blob) => {
            const a = document.createElement('a');
            // 通过 blob 对象获取对应的 url
            const templateUrl = window.URL.createObjectURL(blob);
            a.href = templateUrl;
            a.download = title;
            a.click();
            a.remove();
        });
}

/**
 * 下载文件
 * @param {string} fileUrl - 文件的URL
 * @param {string} fileName - 文件名
 */
export function downloadFile(fileUrl: string, fileName: string) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileUrl, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        const url = window.URL.createObjectURL(xhr.response);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    };
    xhr.send();
}

export function filterMenuByURL(menu: any, urlList: string[]) {
    // 遍历菜单树中的每个菜单项
    for (let i = 0; i < menu.length; i++) {
        // 检查当前菜单项的URL是否匹配要过滤的URL
        if (urlList.includes(menu[i].routePath)) {
            // 如果匹配，则移除当前菜单项
            menu.splice(i, 1);
            i--; // 调整索引以避免遗漏下一个菜单项
        } else if (menu[i].submenus && menu[i].submenus.length > 0) {
            // 如果当前菜单项有子菜单，则递归调用过滤函数
            menu[i].submenus = filterMenuByURL(menu[i].submenus, urlList);
            // 如果过滤后的子菜单为空，则移除当前菜单项
            if (menu[i].submenus.length === 0) {
                menu.splice(i, 1);
                i--; // 调整索引以避免遗漏下一个菜单项
            }
        }
    }
    // console.log(menu);
    // 返回过滤后的菜单树
    return menu;
}

/**
 * 深层数据提取
 * @param data
 * @param dataIndex
 * @returns
 */
export function getIn(data: any, dataIndex: (string | number)[]) {
    return dataIndex.reduce((pre, cur) => (pre ? pre?.[cur] : undefined), data);
}

/**
 * 切割换行符转数组
 */
export const getNumList = (value?: string) => (value ? value?.split('\n') : []);
/**
 * 获取本月第一天
 */
export const getNowMonthFirst = () => {
    const date = new Date();
    const nowMonth = date.getMonth(); //当前月 （值为0~11）
    const nowYear = date.getFullYear(); //当前年
    const firstDay = new Date(nowYear, nowMonth, 1); // 本月开始时间
    return moment(firstDay);
};

/**
 * 获取本月最后一天
 */
export const getNowMonthLast = () => {
    const date = new Date();
    const enddate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return moment(enddate);
};

/**
 * 获取上月第一天
 */
export const getLastMonthFirst = () => {
    const date = new Date();
    const firstDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    return moment(firstDate);
};

/**
 * 获取上月最后一天
 */
export const getLastMonthLast = () => {
    const date = new Date();
    // 获取上个月的最后一天是几号day
    const day = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const enddate = new Date(date.getFullYear(), date.getMonth() - 1, day);
    return moment(enddate);
};

/**
 * 加法精算
 * 添加两个数字并按照指定的精度返回结果。
 * @param {number} num1 - 第一个数字，默认为0。
 * @param {number} num2 - 第二个数字，默认为0。
 * @param {number} precision - 精度，默认为2。
 * @returns {number} - 按指定精度计算后的结果。
 */
export function addWithPrecision(
    num1: number = 0,
    num2: number = 0,
    precision: number = 2,
): number {
    const multiplier = 10 ** precision;
    return (
        (Math.round(Number(num1) * multiplier) + Math.round(Number(num2) * multiplier)) / multiplier
    );
}

export function queryStringToObject(queryString: string) {
    const urlSearchParams = new URLSearchParams(queryString);
    const params = {};

    urlSearchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}

export const getUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // @ts-ignore
        return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
    });
};

export function convertMemory(options: {type: 'gbToMb'|'mbToGb', size: number}) {
    const { type, size } = options;
    let result: any;
    if (type === 'gbToMb') {
        result = size * 1024;
    } else if (type === 'mbToGb') {
        result = size / 1024;
    } else {
        return 'Invalid type';
    }
    // 保留两位小数并转换为数字
    return result != 'Invalid type' ?parseFloat(result.toFixed(2)):'-';
}

// 示例用法
// console.log(convertMemory({ type: 'gbToMb', size: 2 })); // 输出 2048，2 GB 等于 2048 MB
// console.log(convertMemory({ type: 'mbToGb', size: 2048 })); // 输出 2，2048 MB 等于 2 GB

export { judgment, cutTree, enumConversionList, filterKeyArrList, getTreeIds, getUrlParam };
