#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量将HTML文件中的中文内容替换为英文
"""
import re
import os

def replace_chinese_in_file(filepath):
    """替换单个文件中的中文"""
    
    # 读取文件
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 定义替换规则（字典格式）
    replacements = {
        # assignments.html
        '<title>作业提交</title>': '<title>Assignments</title>',
        '<li><a href="index.html">首页</a></li>': '<li><a href="index.html">Home</a></li>',
        '<li><a href="team.html">团队介绍</a></li>': '<li><a href="team.html">Team</a></li>',
        '<li><a href="assignments.html" class="active">作业提交</a></li>': '<li><a href="assignments.html" class="active">Assignments</a></li>',
        '作业提交\n            <button class="edit-btn" onclick="openEditModal(\'assignmentTitle\')">编辑</button>': 'Assignment Submission\n            <button class="edit-btn" onclick="openEditModal(\'assignmentTitle\')">Edit</button>',
        '管理和提交课程作业\n            <button class="edit-btn" onclick="openEditModal(\'assignmentSubtitle\')">编辑</button>': 'Manage and submit course assignments\n            <button class="edit-btn" onclick="openEditModal(\'assignmentSubtitle\')">Edit</button>',
        '<h2 style="font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">作业列表</h2>': '<h2 style="font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Assignments</h2>',
        '<button class="btn btn-secondary" onclick="openGithubConfigModal()">⚙️ GitHub 配置</button>': '<button class="btn btn-secondary" onclick="openGithubConfigModal()">⚙️ GitHub Config</button>',
        '<button class="btn btn-primary" onclick="openAddAssignmentModal()">+ 新建作业</button>': '<button class="btn btn-primary" onclick="openAddAssignmentModal()">+ New Assignment</button>',
        '<!-- 作业将通过 JavaScript 动态加载 -->': '<!-- Assignments will be loaded dynamically via JavaScript -->',
        
        # final-project.html  
        '<title>Final Project</title>': '<title>Final Project</title>',  # Already English
        '<li><a href="index.html">首页</a></li>': '<li><a href="index.html">Home</a></li>',
        '<li><a href="team.html">团队介绍</a></li>': '<li><a href="team.html">Team</a></li>',
        '<li><a href="assignments.html">作业提交</a></li>': '<li><a href="assignments.html">Assignments</li>',
    }
    
    # 执行替换
    modified = False
    for old_text, new_text in replacements.items():
        if old_text in content:
            content = content.replace(old_text, new_text)
            modified = True
            print(f"Replaced: {old_text[:50]}...")
    
    # 写回文件
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Updated: {filepath}")
    else:
        print(f"- No changes: {filepath}")

if __name__ == '__main__':
    files_to_update = [
        'assignments.html',
        'final-project.html',
    ]
    
    base_dir = r'c:\Users\wcl\Documents\001\zwu-2026-1-003'
    
    for filename in files_to_update:
        filepath = os.path.join(base_dir, filename)
        if os.path.exists(filepath):
            replace_chinese_in_file(filepath)
        else:
            print(f"File not found: {filepath}")
    
    print("\nDone!")
