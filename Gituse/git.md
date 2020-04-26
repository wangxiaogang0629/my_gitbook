# Git 命令的使用

> 注：参考文献 [https://www.git-scm.com/book/zh/v2]()

## git配置

* 查看所有的配置以及它们所在的文件
	
	```
	git config --list --show-origin
	```

* 用户信息

	> 安装完 Git 之后，要做的第一件事就是设置你的用户名和邮件地址。 这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改
	> 
	> 当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 --global 选项的命令来配置

	```
	$ git config --global user.name "name"
	$ git config --global user.email name@example.com
	```

## 克隆远程仓库项目

* `git clone` 仓库地址
* 提交本地修改
	
	```
	// 将本地修改添加至暂存区
	git add .
	
	// 将所有通过 git add 暂存的文件内容在数据库中创建一个持久的快照
	// 然后将当前分支上的分支指针移到其之上
	git commit -m '描述'
	
	// 从远程仓库抓取内容，并与本地内容进行合并
	git pull
	
	// 将本地修改推送至远程仓库
	git push
	```

## 新建分支

* 第一步：创建分支
	
	```
	git branch branchname
	```
	
* 第二步：切换分支
	
	```
	git checkout branchname
	```
* 简写：

	```
	git checkout -b branchname
	```

* 在新分支上提交代码

	```
	git add .
	git commit -m '切换分支'
	git pull origin branchname
	git push origin branchname
	```

* 设置 `git push、pull` 默认的提交和获取分支，这样就方便直接使用 `git pull、push` 进行操作

	```
	git branch --set-upstream-to=origin/branchname
	```
	
* 获取远程仓库的新分支

	```
	git fetch
	git checkout branchname
	```

## 合并分支

* 第一步：将你本地的分支切换至想要合并的结果分支（如 master）
* 第二步：合并分支
	
	```
	git merge branchname
	```

	* 当前分支合并其他分支上的更新，和上述操作一致
	
	```
	git checkout 工作分支
	
	// 合并其他分支上的更新
	git merge master 
	```

* 第三步：分支合并后若想删除分支

	```
	git branch -d branchname
	```
	
* 第四步：删除远程仓库分支

	```
	git push origin -d branchname
	```

* 注意：合并分支时有冲突如下
	
	```
	$ git merge branchname
	Auto-merging index.html
	CONFLICT (content): Merge conflict in index.html
	Automatic merge failed; fix conflicts and then commit the result.
	```
	* 需要手动解决冲突之后继续合并
	* 合并冲突时的任意时刻使用 `git status` 来查看那些因包含合并冲突而处于未合并状态的文件
	* 使用图形化工具解决冲突 `git mergetool`
	* 冲突解决后 使用 `git commit` 来完成合并并提交

## git 版本回退

* 第一步

	```
	 `git log` 查看当前分支的提交记录 找到需要回退的版本id（commitID）
	```
* 第二步

	```
	 `git reset --hard HEAD` HEAD 需要回退的版本commitID
	```

* 第三步

	```
	 `git push origin branch --force` 强推至回退分支
	```
## git 常用命令
* `git fetch`			从远程获取其他用户 push 上来的新分支
* `git remote -v` 		查看远程 git 库地址
* `git stash` 			将会把当前目录和 index 中的所有改动(但不包括未 track 的文件)压入一个栈,然后留给你一个 clean 的工作状态,即处于上一次最新提交处.
* `git stash apply` 	取出 stash 中的上一个项目 (stash@{0}),并且应用于当前的工作目录.也可以指定别的项目,比如 git stash apply stash@{1}.
* `git stash drop`		删除上一个,也可指定参数删除指定的一个项目.
* `git branch` 查看 git 分支
* `git branch -a` 查看远程所有分支

## git 本地已经修改，但需要切换git的push分支
* add 但不 commit，可以 stash，然后 checkout 回来之后 stash apply，在 commit，提交到当前分支
* add 但不 commit，也不 stash，直接 checkout，然后再 commit 的话，记录就在切换分支下面。

## 忽略文件 .gitignore

> 有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表，我们可以创建一个名为 .gitignore 的文件，列出要忽略的文件

* 格式规范
	* 所有空行或者以 # 开头的行都会被 Git 忽略 也就是注释。
	* 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。
	* 匹配模式可以以（/）开头防止递归。
	* 匹配模式可以以（/）结尾指定目录。
	* 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（!）取反。

* 示例
	
	```
	# 忽略所有的 .a 文件
	*.a
	
	# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
	!lib.a
	
	# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
	/TODO
	
	# 忽略任何目录下名为 build 的文件夹
	build/
	
	# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
	doc/*.txt
	
	# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
	doc/**/*.pdf
	```
* GitHub 有一个十分详细的针对数十种项目及语言的 .gitignore 文件列表， 可以在 [https://github.com/github/gitignore]() 找到它
* 注意：若在创建.gitignore 文件之前提交过代码，已将文件上传

	> 新建的文件在 git 中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore中已经声明了忽略路径也是不起作用的，这时候我们就应该先把本地缓存删除，然后再进行 push，这样就不会出现忽略的文件了。git清除本地缓存命令如下：

	```
	git rm -r --cached .
	git add .
	git commit -m 'update .gitignore'
	```

## 移除文件

> 要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。 可以用 `git rm` 命令完成此项工作，并连带从工作目录中删除指定的文件，这样以后就不会出现在未跟踪文件清单中了。

* 如果只是简单地从工作目录中手工删除文件，运行 `git status` 时就会在 “Changes not staged for commit” 部分（也就是 未暂存清单）
* 还需要再运行 `git rm` 记录此次移除文件的操作，这样下一次提交时，该文件就不再纳入版本管理。

## 撤销操作

* 若在 commit 之后想撤销操作

	```
	// HEAD^的意思是上一个版本，也可以写成HEAD~1
	// 如果进行了2次commit，想都撤回，可以使用HEAD~2
	
	git reset --soft HEAD^
	```

* 如果 commit 注释写错了，只是想改一下注释

	```
	git commit --amend
	```










