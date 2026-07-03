import { create } from 'zustand';

export interface TermCard {
  id: string;
  en: string;
  zh: string;
  definition: string;
  analogy: string;
}

export const ALL_TERMS: TermCard[] = [
  { id: 'transformer', en: 'Transformer', zh: '变换器架构', definition: '2017年由Google研究员提出的一种AI架构，专为处理和生成人类语言而设计。它是当今几乎所有大语言模型的基础骨架。', analogy: '💡 就像一种"建筑方法"——Claude和GPT都是用这同一种方法盖出来的不同大楼。' },
  { id: 'tokenization', en: 'Tokenization', zh: '分词', definition: '将一段连续的文本拆解为一个个被称为"token"的基本单元。Token可以是一个完整的词、一个词的一部分、甚至一个字符。', analogy: '💡 就像寿司师傅把一整条鱼切成一片一片的鱼片。' },
  { id: 'token', en: 'Token', zh: '词元 / 令牌', definition: 'AI模型处理文本的最小单位。它不总是一个完整的词——英文中"unhappiness"可能被切成"un"+"happiness"两个token；中文中"今天"可能是一个token，也可能被切成"今"+"天"两个token，取决于模型的词汇表。', analogy: '💡 就像乐高积木中的一块积木——是组成整体的最小零件。' },
  { id: 'embedding', en: 'Embedding', zh: '嵌入', definition: '将一个token（文字碎片）转换为一组数字——也就是一个向量。这组数字像一个"坐标"，记录了这个词在语义空间中的位置。', analogy: '💡 给每个词分配一个"宇宙坐标"，意思相近的词，坐标也相近。' },
  { id: 'vector', en: 'Vector', zh: '向量', definition: '一组有序的数字。在AI中，一个向量通常包含几百到几千个数字，每个数字代表这个词在某个维度上的特征值。你可以把它理解为一个超级详细的坐标，不是二维或三维的，而是几百维的。', analogy: '💡 你家地址可以用经度和纬度两个数字表示位置。向量就像一个需要768个数字才能精确表示位置的超级地址。' },
  { id: 'positional-encoding', en: 'Positional Encoding', zh: '位置编码', definition: '给每个token的向量额外添加一组数字，这组数字记录了该token在句子中的位置（第1个、第2个、第3个……）。', analogy: '💡 嵌入向量是"我是谁"，位置编码是"我站在队伍的第几个"。两者加在一起，模型才既知道你是谁，又知道你站在哪儿。' },
  { id: 'self-attention', en: 'Self-Attention', zh: '自注意力机制', definition: '一种让句子中的每个词去"看"其他所有词的机制。它计算任意两个词之间的相关程度，然后让每个词根据这些相关度来吸收其他词的信息。', analogy: '💡 就像在派对上环顾四周，判断"谁跟我关系最大"，然后重点和那些人交谈。' },
  { id: 'query', en: 'Query (Q)', zh: '查询向量', definition: '代表当前这个词正在寻找的信息。像是一个"问题"——"我需要什么样的信息？"', analogy: '🙋 你走进一个房间，脑子里有一个问题想问别人。Q就是你脑子里的那个问题。' },
  { id: 'key', en: 'Key (K)', zh: '键向量', definition: '代表每个词能够提供的信息标签。像是一个"名牌"——"我这里有什么样的信息。"', analogy: '🏷️ 房间里每个人胸前都挂着名牌，写着自己的专长。K就是那个名牌。' },
  { id: 'value', en: 'Value (V)', zh: '值向量', definition: '代表每个词实际携带的信息内容。当Q和K匹配上了，V就是对方真正传递给你的详细信息。', analogy: '📦 当你找到了对的人，你们坐下来深入聊天。V就是对方告诉你的具体内容。' },
  { id: 'softmax', en: 'Softmax', zh: '软最大化函数', definition: '一种数学函数，将一组任意的数字转换为一组概率（所有数字变为正数且加起来等于1）。分数越高的项获得越大的概率。', analogy: '💡 就像老师把全班的考试分数转换成排名百分比。分数最高的人获得最大的百分比。' },
  { id: 'multi-head-attention', en: 'Multi-Head Attention', zh: '多头注意力', definition: '同时使用多个独立的注意力头并行处理输入。每个头学到关注不同类型的关系，最后将所有头的结果拼接合并。', analogy: '💡 就像N个侦探同时从不同角度调查同一个案件——查指纹、查监控、查人际关系——最后汇总得到最完整的真相。' },
  { id: 'ffn', en: 'Feed-Forward Network', zh: '前馈神经网络', definition: '一种简单的神经网络层，对每个token独立地进行变换。它不像注意力机制那样让词与词交互，而是对每个词自己内部的信息进行"加工处理"。', analogy: '💡 注意力机制是"理解上下文关系"的能力，FFN是"从记忆中调取知识"的仓库。' },
  { id: 'transformer-layer', en: 'Transformer Layer', zh: 'Transformer层', definition: '一个完整的处理单元，包含一次多头自注意力计算和一次前馈网络处理。现代大模型将这样的层堆叠几十到上百次。', analogy: '💡 就像一栋摩天大楼——每上一层，看到的风景就更广阔。低层看到的是细节，高层看到的是全局。' },
  { id: 'next-token-prediction', en: 'Next Token Prediction', zh: '下一词元预测', definition: '大语言模型最核心的工作方式——给定前面已有的所有文本，预测最可能出现的下一个token是什么。然后把预测的token拼接到文本末尾，再次预测下一个。', analogy: '💡 就像一个超级强大的"文字接龙"——每次只接一个词，但它能接得天衣无缝。' },
  { id: 'pre-training', en: 'Pre-training', zh: '预训练', definition: '模型训练的第一个阶段。将互联网上的海量文本喂给模型，让它通过"预测下一个词"的任务来学习语言的规律和世界知识。这个阶段不需要人工标注，纯粹靠大量阅读来"自学"。', analogy: '💡 就像一个小孩从出生到上学前的阶段——通过大量阅读、听大人说话来认识世界。还不会"做事"，但已经"知道很多东西"。' },
  { id: 'instruction-tuning', en: 'Instruction Tuning', zh: '指令微调', definition: '模型训练的第二个阶段。人类标注员编写大量的"指令→优质回答"的配对数据，教模型按照人类的意图来回应请求，而不是单纯地补全文本。', analogy: '💡 就像孩子上学后，老师教他"别人问你问题时要好好回答，不要自说自话"。' },
  { id: 'rlhf', en: 'RLHF', zh: '基于人类反馈的强化学习', definition: '模型训练的第三个阶段。让人类对模型给出的多个回答进行打分或排序，然后用"强化学习"算法让模型学习生成得分更高的回答。目标是让模型的输出符合人类的偏好。', analogy: '💡 就像训练小狗——做对了给零食，做错了不给。久而久之就学会了什么行为是好的。' },
  { id: 'reinforcement-learning', en: 'Reinforcement Learning', zh: '强化学习', definition: '一种让AI通过"试错+奖惩反馈"来学习的方法。做得好→获得正向奖励→以后多这样做。做得差→获得负向反馈→以后少这样做。', analogy: '💡 打游戏时，做出正确操作得分加100，做出错误操作扣50。多玩几局你就知道该怎么打了。' },
  { id: 'chain-of-thought', en: 'Chain-of-Thought', zh: '思维链推理', definition: '让模型在给出最终答案之前，先显式地一步一步地写出推理过程，就像人类在草稿纸上列出解题步骤。这通常能提升数学和复杂推理的准确率。', analogy: '💡 不是直接告诉你答案是42，而是先写出解题的每一步——让你（和模型自己）都能检查推理过程。' },
  { id: 'agentic', en: 'Agentic', zh: '智能体式的', definition: '指AI不只是对话，还能像一个"代理人"一样自主地执行多步骤任务——规划、执行、检查、调整。', analogy: '💡 不是一个只会聊天的客服，而是一个能真正帮你干活的助手。' },
  { id: 'benchmark', en: 'Benchmark', zh: '基准测试', definition: '一组标准化的测试题，用来衡量AI模型在特定领域的能力。不同的模型做同一套题，分数高的就更强。', analogy: '💡 就像高考——所有考生做同一套卷子，分数说话。' },
  { id: 'emergence', en: 'Emergence', zh: '涌现', definition: '当大量简单的个体按照简单的规则相互作用时，系统整体产生了任何单个个体都不具备的复杂能力或特征。涌现的特性不能被"还原"到单个组成部分。', analogy: '💡 水分子没有"湿"的属性，但大量水分子在一起就是湿的。蚂蚁个体很蠢，但蚁群却能建造复杂的蚁巢。' },
  { id: 'hallucination', en: 'Hallucination', zh: 'AI幻觉', definition: '大语言模型有时会生成听起来合理、格式正确，但实际上是错误或虚假的内容——而且它说这些内容时的语气和说真话时完全一样。', analogy: '💡 就像一个口才极好、自信满满的学生在考场上编答案——说得头头是道，但其实他不知道正确答案。' },
];

interface AppState {
  unlockedTerms: string[];
  currentChapter: number;
  soundEnabled: boolean;
  glossaryOpen: boolean;
  activeTermCard: string | null;
  quizAnswers: Record<string, number>;
  unlockTerm: (id: string) => void;
  setCurrentChapter: (ch: number) => void;
  toggleSound: () => void;
  toggleGlossary: () => void;
  showTermCard: (id: string | null) => void;
  setQuizAnswer: (id: string, answer: number) => void;
}

export const useStore = create<AppState>((set) => ({
  unlockedTerms: [],
  currentChapter: 0,
  soundEnabled: false,
  glossaryOpen: false,
  activeTermCard: null,
  quizAnswers: {},
  unlockTerm: (id) => set((s) => ({
    unlockedTerms: s.unlockedTerms.includes(id) ? s.unlockedTerms : [...s.unlockedTerms, id]
  })),
  setCurrentChapter: (ch) => set({ currentChapter: ch }),
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  toggleGlossary: () => set((s) => ({ glossaryOpen: !s.glossaryOpen })),
  showTermCard: (id) => set({ activeTermCard: id }),
  setQuizAnswer: (id, answer) => set((s) => ({ quizAnswers: { ...s.quizAnswers, [id]: answer } })),
}));
